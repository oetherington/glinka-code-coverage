var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   20","line":"const Compiler = @import(\"../compiler.zig\").Compiler;"},
{"lineNum":"   21","line":"const CompileError = @import(\"../errors/compile_error.zig\").CompileError;"},
{"lineNum":"   22","line":"const AssignError = @import(\"../errors/assign_error.zig\").AssignError;"},
{"lineNum":"   23","line":"const GenericError = @import(\"../errors/generic_error.zig\").GenericError;"},
{"lineNum":"   24","line":"const OpError = @import(\"../errors/op_error.zig\").OpError;"},
{"lineNum":"   25","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   26","line":"const InferResult = @import(\"infer_result.zig\").InferResult;"},
{"lineNum":"   27","line":"const InferContext = @import(\"infer_context.zig\").InferContext;"},
{"lineNum":"   28","line":"const InferTestCase = @import(\"infer_test_case.zig\").InferTestCase;"},
{"lineNum":"   29","line":"const inferExprType = @import(\"inferrer.zig\").inferExprType;"},
{"lineNum":"   30","line":"const Scope = @import(\"../scope.zig\").Scope;"},
{"lineNum":"   31","line":"const TypeBook = @import(\"../typebook.zig\").TypeBook;"},
{"lineNum":"   32","line":"const Type = @import(\"../../common/types/type.zig\").Type;"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"fn checkAssignability(","class":"lineCov","hits":"1","order":"3678","possible_hits":"1",},
{"lineNum":"   35","line":"    cmp: *Compiler,"},
{"lineNum":"   36","line":"    csr: Cursor,"},
{"lineNum":"   37","line":"    op: node.BinaryOp,"},
{"lineNum":"   38","line":") ?CompileError {"},
{"lineNum":"   39","line":"    std.debug.assert(op.left.ty != null);","class":"lineCov","hits":"1","order":"3679","possible_hits":"1",},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"    switch (op.left.data) {","class":"lineCov","hits":"3","order":"3680","possible_hits":"3",},
{"lineNum":"   42","line":"        .Ident => |ident| {","class":"lineCov","hits":"1","order":"5130","possible_hits":"1",},
{"lineNum":"   43","line":"            const sym = cmp.scope.get(ident);","class":"lineCov","hits":"1","order":"5131","possible_hits":"1",},
{"lineNum":"   44","line":"            std.debug.assert(sym != null);","class":"lineCov","hits":"1","order":"5132","possible_hits":"1",},
{"lineNum":"   45","line":"            if (sym.?.isConst) {","class":"linePartCov","hits":"2","order":"5133","possible_hits":"3",},
{"lineNum":"   46","line":"                return CompileError.genericError(GenericError.new(","class":"lineCov","hits":"1","order":"5361","possible_hits":"1",},
{"lineNum":"   47","line":"                    csr,"},
{"lineNum":"   48","line":"                    cmp.fmt(\"Invalid assignment - \'{s}\' is const\", .{ident}),","class":"lineCov","hits":"1","order":"5360","possible_hits":"1",},
{"lineNum":"   49","line":"                ));"},
{"lineNum":"   50","line":"            }"},
{"lineNum":"   51","line":"        },"},
{"lineNum":"   52","line":"        .Dot => |dot| if (dot.expr.ty.?.getType() == .Class) {","class":"linePartCov","hits":"2","order":"3681","possible_hits":"3",},
{"lineNum":"   53","line":"            const cls = dot.expr.ty.?.Class;","class":"linePartCov","hits":"1","order":"3682","possible_hits":"3",},
{"lineNum":"   54","line":"            const member = cls.getNamedMember(dot.ident);","class":"lineCov","hits":"1","order":"3683","possible_hits":"1",},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"            // If member is null then an error will already have been generated"},
{"lineNum":"   57","line":"            // when processing the sub-node"},
{"lineNum":"   58","line":"            if (member) |mem| if (mem.isReadOnly)","class":"lineCov","hits":"3","order":"3684","possible_hits":"3",},
{"lineNum":"   59","line":"                return CompileError.genericError(GenericError.new(","class":"lineCov","hits":"1","order":"3694","possible_hits":"1",},
{"lineNum":"   60","line":"                    csr,"},
{"lineNum":"   61","line":"                    cmp.fmt(","class":"lineCov","hits":"2","order":"3692","possible_hits":"2",},
{"lineNum":"   62","line":"                        \"Cannot assign to readonly member \'{s}\' of class \'{s}\'\","},
{"lineNum":"   63","line":"                        .{ mem.name, cls.name },","class":"lineCov","hits":"1","order":"3693","possible_hits":"1",},
{"lineNum":"   64","line":"                    ),"},
{"lineNum":"   65","line":"                ));"},
{"lineNum":"   66","line":"        },"},
{"lineNum":"   67","line":"        .ArrayAccess => {"},
{"lineNum":"   68","line":"            // TODO: Validate class members and check for readonly"},
{"lineNum":"   69","line":"        },"},
{"lineNum":"   70","line":"        else => return CompileError.genericError(GenericError.new(","class":"lineCov","hits":"1","order":"6897","possible_hits":"1",},
{"lineNum":"   71","line":"            csr,"},
{"lineNum":"   72","line":"            \"Invalid assignment - target expression is not an l-value\","},
{"lineNum":"   73","line":"        )),"},
{"lineNum":"   74","line":"    }"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"    return null;","class":"lineCov","hits":"1","order":"3685","possible_hits":"1",},
{"lineNum":"   77","line":"}"},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"pub fn inferBinaryOpType(","class":"lineCov","hits":"1","order":"3647","possible_hits":"1",},
{"lineNum":"   80","line":"    cmp: *Compiler,"},
{"lineNum":"   81","line":"    nd: node.Node,"},
{"lineNum":"   82","line":"    ctx: *const InferContext,"},
{"lineNum":"   83","line":"    op: node.BinaryOp,"},
{"lineNum":"   84","line":") InferResult {"},
{"lineNum":"   85","line":"    const subCtx = InferContext.none(ctx);","class":"lineCov","hits":"1","order":"3648","possible_hits":"1",},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"    const left = switch (inferExprType(cmp, op.left, &subCtx)) {","class":"linePartCov","hits":"1","order":"3649","possible_hits":"2",},
{"lineNum":"   88","line":"        .Success => |res| res,","class":"lineCov","hits":"1","order":"3667","possible_hits":"1",},
{"lineNum":"   89","line":"        .Error => |err| return InferResult.err(err),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   90","line":"    };"},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"    const right = switch (inferExprType(cmp, op.right, &subCtx)) {","class":"linePartCov","hits":"1","order":"3668","possible_hits":"2",},
{"lineNum":"   93","line":"        .Success => |res| res,","class":"lineCov","hits":"1","order":"3669","possible_hits":"1",},
{"lineNum":"   94","line":"        .Error => |err| return InferResult.err(err),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":"    };"},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"    if (!right.isAssignableTo(left))","class":"lineCov","hits":"2","order":"3670","possible_hits":"2",},
{"lineNum":"   98","line":"        return InferResult.err(CompileError.assignError(","class":"lineCov","hits":"1","order":"5139","possible_hits":"1",},
{"lineNum":"   99","line":"            AssignError.new(nd.csr, left, right),","class":"lineCov","hits":"1","order":"5138","possible_hits":"1",},
{"lineNum":"  100","line":"        ));"},
{"lineNum":"  101","line":""},
{"lineNum":"  102","line":"    const entry = cmp.typebook.getOpEntry(op.op);","class":"lineCov","hits":"1","order":"3671","possible_hits":"1",},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"    // We assume it\'s binary, otherwise the Node wouldn\'t have parsed"},
{"lineNum":"  105","line":"    std.debug.assert(entry == null or entry.?.getType() == .Binary);","class":"linePartCov","hits":"1","order":"3672","possible_hits":"2",},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"    if (entry == null or !left.isAssignableTo(entry.?.Binary.input))","class":"linePartCov","hits":"2","order":"3675","possible_hits":"3",},
{"lineNum":"  108","line":"        return InferResult.err(CompileError.opError(OpError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  109","line":"            nd.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":"            op.op,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":"            left,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"        )));"},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"    if (entry.?.Binary.isAssign)","class":"linePartCov","hits":"2","order":"3676","possible_hits":"3",},
{"lineNum":"  115","line":"        if (checkAssignability(cmp, nd.csr, op)) |err|","class":"lineCov","hits":"2","order":"3677","possible_hits":"2",},
{"lineNum":"  116","line":"            return InferResult.err(err);","class":"lineCov","hits":"1","order":"3695","possible_hits":"1",},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"    nd.ty = if (entry.?.Binary.output) |out| out else left;","class":"linePartCov","hits":"1","order":"3686","possible_hits":"2",},
{"lineNum":"  119","line":"    return InferResult.success(nd.ty.?);","class":"linePartCov","hits":"1","order":"3687","possible_hits":"2",},
{"lineNum":"  120","line":"}"},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"test \"can infer type of binary op expressions\" {","class":"lineCov","hits":"3","order":"6879","possible_hits":"3",},
{"lineNum":"  123","line":"    const int = node.makeNode(","class":"lineCov","hits":"1","order":"6881","possible_hits":"1",},
{"lineNum":"  124","line":"        std.testing.allocator,"},
{"lineNum":"  125","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"6880","possible_hits":"1",},
{"lineNum":"  126","line":"        .Int,"},
{"lineNum":"  127","line":"        \"3\","},
{"lineNum":"  128","line":"    );"},
{"lineNum":"  129","line":"    defer std.testing.allocator.destroy(int);","class":"linePartCov","hits":"1","order":"6887","possible_hits":"2",},
{"lineNum":"  130","line":""},
{"lineNum":"  131","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6886","possible_hits":"2",},
{"lineNum":"  132","line":"        .expectedTy = .Number,"},
{"lineNum":"  133","line":"    }).run(.BinaryOp, node.BinaryOp{","class":"lineCov","hits":"1","order":"6885","possible_hits":"1",},
{"lineNum":"  134","line":"        .op = .Add,","class":"lineCov","hits":"1","order":"6884","possible_hits":"1",},
{"lineNum":"  135","line":"        .left = int,","class":"lineCov","hits":"1","order":"6882","possible_hits":"1",},
{"lineNum":"  136","line":"        .right = int,","class":"lineCov","hits":"1","order":"6883","possible_hits":"1",},
{"lineNum":"  137","line":"    });"},
{"lineNum":"  138","line":"}"},
{"lineNum":"  139","line":""},
{"lineNum":"  140","line":"test \"left-hand side of an assignment must be an l-value\" {","class":"lineCov","hits":"3","order":"6888","possible_hits":"3",},
{"lineNum":"  141","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  142","line":"    const csr = Cursor.new(0, 0);","class":"lineCov","hits":"1","order":"6889","possible_hits":"1",},
{"lineNum":"  143","line":"    const nodes = &[_]node.Node{","class":"lineCov","hits":"1","order":"6892","possible_hits":"1",},
{"lineNum":"  144","line":"        node.makeNode(alloc, csr, .Int, \"3\"),","class":"lineCov","hits":"1","order":"6890","possible_hits":"1",},
{"lineNum":"  145","line":"        node.makeNode(alloc, csr, .Int, \"4\"),","class":"lineCov","hits":"1","order":"6891","possible_hits":"1",},
{"lineNum":"  146","line":"    };"},
{"lineNum":"  147","line":"    defer for (nodes) |n| std.testing.allocator.destroy(n);","class":"linePartCov","hits":"1","order":"6907","possible_hits":"2",},
{"lineNum":"  148","line":""},
{"lineNum":"  149","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6906","possible_hits":"2",},
{"lineNum":"  150","line":"        .check = (struct {"},
{"lineNum":"  151","line":"            pub fn check(","class":"lineCov","hits":"1","order":"6899","possible_hits":"1",},
{"lineNum":"  152","line":"                scope: *Scope,"},
{"lineNum":"  153","line":"                typebook: *TypeBook,"},
{"lineNum":"  154","line":"                res: InferResult,"},
{"lineNum":"  155","line":"            ) !void {","class":"lineCov","hits":"1","order":"6905","possible_hits":"1",},
{"lineNum":"  156","line":"                _ = scope;"},
{"lineNum":"  157","line":"                _ = typebook;"},
{"lineNum":"  158","line":"                try std.testing.expect(res.getType() == .Error);","class":"lineCov","hits":"1","order":"6900","possible_hits":"1",},
{"lineNum":"  159","line":"                const err = res.Error;","class":"linePartCov","hits":"2","order":"6901","possible_hits":"3",},
{"lineNum":"  160","line":"                try std.testing.expect(err.getType() == .GenericError);","class":"linePartCov","hits":"1","order":"6902","possible_hits":"2",},
{"lineNum":"  161","line":"                try std.testing.expectEqualStrings(","class":"linePartCov","hits":"1","order":"6904","possible_hits":"2",},
{"lineNum":"  162","line":"                    \"Invalid assignment - target expression is not an l-value\","},
{"lineNum":"  163","line":"                    err.GenericError.msg,","class":"linePartCov","hits":"2","order":"6903","possible_hits":"3",},
{"lineNum":"  164","line":"                );"},
{"lineNum":"  165","line":"            }"},
{"lineNum":"  166","line":"        }).check,"},
{"lineNum":"  167","line":"    }).run(.BinaryOp, node.BinaryOp{","class":"lineCov","hits":"1","order":"6896","possible_hits":"1",},
{"lineNum":"  168","line":"        .op = .Assign,","class":"lineCov","hits":"1","order":"6895","possible_hits":"1",},
{"lineNum":"  169","line":"        .left = nodes[0],","class":"lineCov","hits":"1","order":"6893","possible_hits":"1",},
{"lineNum":"  170","line":"        .right = nodes[1],","class":"lineCov","hits":"1","order":"6894","possible_hits":"1",},
{"lineNum":"  171","line":"    });"},
{"lineNum":"  172","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:55:52", "instrumented" : 68, "covered" : 62,};
var merged_data = [];
